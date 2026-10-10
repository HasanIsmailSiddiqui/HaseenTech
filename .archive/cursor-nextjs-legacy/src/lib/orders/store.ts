import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { OrderRecord, OrderStatus } from "@/lib/orders/types";

function ordersFile() {
  const dir = process.env.ORDERS_STORE_DIR ?? path.join(process.cwd(), ".data");
  return path.join(dir, "orders.json");
}

async function readAll(): Promise<OrderRecord[]> {
  try {
    const raw = await readFile(ordersFile(), "utf8");
    return JSON.parse(raw) as OrderRecord[];
  } catch {
    return [];
  }
}

async function writeAll(orders: OrderRecord[]) {
  const file = ordersFile();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(orders, null, 2), "utf8");
}

export async function createOrder(order: Omit<OrderRecord, "id" | "createdAt" | "updatedAt" | "webhookEvents">) {
  const record: OrderRecord = {
    ...order,
    id: randomUUID(),
    webhookEvents: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const orders = await readAll();
  orders.push(record);
  await writeAll(orders);
  return record;
}

export async function getOrderById(id: string) {
  const orders = await readAll();
  return orders.find((o) => o.id === id) ?? null;
}

export async function updateOrder(id: string, patch: Partial<OrderRecord>) {
  const orders = await readAll();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], ...patch, updatedAt: new Date().toISOString() };
  await writeAll(orders);
  return orders[idx];
}

export async function appendWebhookEvent(orderId: string, eventId: string) {
  const order = await getOrderById(orderId);
  if (!order) return null;
  if (order.webhookEvents.includes(eventId)) {
    return { order, duplicate: true as const };
  }
  return {
    order: await updateOrder(orderId, {
      webhookEvents: [...order.webhookEvents, eventId],
    }),
    duplicate: false as const,
  };
}

export async function listOrders(limit = 100) {
  const orders = await readAll();
  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export async function setOrderStatus(id: string, status: OrderStatus, extra?: Partial<OrderRecord>) {
  return updateOrder(id, { status, ...extra });
}
