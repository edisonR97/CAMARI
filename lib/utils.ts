export const money = (value: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
export const cn = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
export const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const waUrl = (number: string, message: string) => `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
