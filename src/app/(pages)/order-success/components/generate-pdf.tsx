import jsPDF from "jspdf";
import { rupiahFormat, getFormattedDate } from "@/lib/utils";
import { ProductType } from "@/app/components/card-product";

interface props {
  customer: string | null;
  payment: string | null;
  product: ProductType[];
  orderId: string | null;
  discountRate?: number;
  taxRate?: number;
}

export default function generatePDF({
  customer,
  payment,
  product,
  orderId,
  discountRate = 0,
  taxRate = 10,
}: props) {
  const doc = new jsPDF({
    unit: "mm",
    format: [58, 20],
  });

  const lineHeight = 4;
  const pageHeight = 20; 
  const marginBottom = 10;
  let y = 10;

  const addNewPage = () => {
    doc.addPage();
    y = 10; 
  };

  // Header
  doc.setFontSize(9);
  doc.text("Point Of Sales", 29, y, { align: "center" });
  y += lineHeight;
  doc.setFontSize(7);
  doc.text(`Order ID: ${orderId}`, 29, y, { align: "center" });
  y += lineHeight;
  doc.text(getFormattedDate(), 29, y, { align: "center" });
  y += lineHeight * 2;

  // Customer and Payment Info
  doc.setFontSize(6);
  doc.text(`Customer: ${customer}`, 2, y);
  y += lineHeight;
  doc.text(`Payment: ${payment}`, 2, y);
  y += lineHeight * 2;

  // Product List
  doc.text("Items:", 2, y);
  y += lineHeight;

  const subtotal = product.reduce(
    (acc, item) => acc + item.harga * item.qty,
    0
  );
  const discount = (discountRate / 100) * subtotal;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = (taxRate / 100) * subtotalAfterDiscount;
  const total = subtotalAfterDiscount + tax;

  product.forEach((item) => {
    if (y + lineHeight > pageHeight - marginBottom) addNewPage();
    doc.text(`${item.nama}`, 2, y);
    doc.text(`${item.qty} x ${rupiahFormat(item.harga)}`, 40, y, {
      align: "right",
    });
    y += lineHeight;
  });

  if (y + lineHeight > pageHeight - marginBottom) addNewPage();
  doc.line(2, y, 56, y); // Separator
  y += lineHeight;

  // Summary
  const summaryItems = [
    { label: "Subtotal:", value: rupiahFormat(subtotal) },
    { label: `Discount (${discountRate}%):`, value: `-${rupiahFormat(discount)}` },
    { label: `Tax (${taxRate}%):`, value: rupiahFormat(tax) },
    { label: "Total:", value: rupiahFormat(total) },
  ];

  summaryItems.forEach(({ label, value }) => {
    if (y + lineHeight > pageHeight - marginBottom) addNewPage();
    doc.text(label, 2, y);
    doc.text(value, 56, y, { align: "right" });
    y += lineHeight;
  });

  // Footer
  if (y + lineHeight * 2 > pageHeight - marginBottom) addNewPage();
  doc.setFontSize(5);
  doc.text("Thank you for your purchase!", 29, y, { align: "center" });
  y += lineHeight;
  doc.text("For inquiries, contact: support@pos.com", 29, y, {
    align: "center",
  });

  doc.save("receipt.pdf");
}
