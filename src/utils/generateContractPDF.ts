import jsPDF from "jspdf";

interface QuoteItem {
  description: string;
  quantity: number | null;
  unit_price: number | null;
  total_price: number | null;
}

interface ContractPDFData {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  contractType: string;
  notes?: string;
  quoteItems?: QuoteItem[];
  totalValue?: number;
  tenantName: string;
  tenantLogo?: string;
  signatureData?: string;
  signedAt?: string;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  party: "Festa",
  rental: "Locação de Brinquedos",
  decoration: "Decoração",
  other: "Serviço",
};

export const generateContractPDF = async (data: ContractPDFData): Promise<Blob> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Helper function to add text
  const addText = (text: string, x: number, y: number, options?: { fontSize?: number; fontStyle?: string; align?: "left" | "center" | "right" }) => {
    const { fontSize = 12, fontStyle = "normal", align = "left" } = options || {};
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    
    let xPos = x;
    if (align === "center") {
      xPos = pageWidth / 2;
    } else if (align === "right") {
      xPos = pageWidth - margin;
    }
    
    doc.text(text, xPos, y, { align });
    return y + (fontSize / 2.5);
  };

  // Header
  yPos = addText(data.tenantName, margin, yPos, { fontSize: 22, fontStyle: "bold" });
  yPos += 5;
  
  // Title
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;
  
  yPos = addText("CONTRATO DE SERVIÇOS", margin, yPos, { fontSize: 16, fontStyle: "bold", align: "center" });
  yPos += 15;

  // Contract Info Section
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPos - 5, pageWidth - (margin * 2), 35, "F");
  
  yPos = addText("DADOS DO CLIENTE", margin + 5, yPos, { fontSize: 12, fontStyle: "bold" });
  yPos += 3;
  yPos = addText(`Nome: ${data.clientName}`, margin + 5, yPos, { fontSize: 11 });
  if (data.clientPhone) {
    yPos = addText(`Telefone: ${data.clientPhone}`, margin + 5, yPos, { fontSize: 11 });
  }
  if (data.clientEmail) {
    yPos = addText(`Email: ${data.clientEmail}`, margin + 5, yPos, { fontSize: 11 });
  }
  yPos += 10;

  // Contract Type and Date
  yPos = addText(`Tipo de Serviço: ${typeLabels[data.contractType] || data.contractType}`, margin, yPos, { fontSize: 11 });
  yPos = addText(`Data de Emissão: ${new Date(data.createdAt).toLocaleDateString("pt-BR")}`, margin, yPos, { fontSize: 11 });
  yPos += 10;

  // Items Table (if quote items exist)
  if (data.quoteItems && data.quoteItems.length > 0) {
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    yPos = addText("ITENS DO ORÇAMENTO", margin, yPos, { fontSize: 12, fontStyle: "bold" });
    yPos += 8;

    // Table header
    doc.setFillColor(230, 230, 230);
    doc.rect(margin, yPos - 5, pageWidth - (margin * 2), 10, "F");
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Descrição", margin + 5, yPos);
    doc.text("Qtd", pageWidth - 80, yPos, { align: "center" });
    doc.text("Unit.", pageWidth - 55, yPos, { align: "center" });
    doc.text("Total", pageWidth - margin - 5, yPos, { align: "right" });
    yPos += 8;

    // Table rows
    doc.setFont("helvetica", "normal");
    data.quoteItems.forEach((item) => {
      // Check if we need a new page
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }
      
      const description = item.description.length > 35 
        ? item.description.substring(0, 35) + "..." 
        : item.description;
      
      doc.text(description, margin + 5, yPos);
      doc.text(String(item.quantity || 1), pageWidth - 80, yPos, { align: "center" });
      doc.text(`R$ ${(item.unit_price || 0).toFixed(2)}`, pageWidth - 55, yPos, { align: "center" });
      doc.text(`R$ ${(item.total_price || 0).toFixed(2)}`, pageWidth - margin - 5, yPos, { align: "right" });
      yPos += 7;
    });

    yPos += 5;
    doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3);
    
    // Total
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    yPos = addText(`VALOR TOTAL: R$ ${(data.totalValue || 0).toFixed(2)}`, pageWidth - margin - 5, yPos + 5, { fontSize: 12, fontStyle: "bold", align: "right" });
    yPos += 10;
  }

  // Notes Section
  if (data.notes) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
    
    yPos = addText("OBSERVAÇÕES", margin, yPos, { fontSize: 12, fontStyle: "bold" });
    yPos += 5;
    
    // Split notes into lines
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const splitNotes = doc.splitTextToSize(data.notes, pageWidth - (margin * 2));
    splitNotes.forEach((line: string) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin, yPos);
      yPos += 5;
    });
    yPos += 10;
  }

  // Terms Section
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;
  
  yPos = addText("TERMOS E CONDIÇÕES", margin, yPos, { fontSize: 12, fontStyle: "bold" });
  yPos += 5;
  
  const terms = [
    "1. O presente contrato estabelece os termos para a prestação dos serviços descritos acima.",
    "2. O cliente declara estar ciente e de acordo com todas as condições estabelecidas.",
    "3. Este documento possui validade jurídica quando assinado digitalmente por ambas as partes.",
    "4. Qualquer alteração neste contrato deverá ser feita por escrito e aprovada pelas partes.",
  ];
  
  doc.setFontSize(9);
  terms.forEach((term) => {
    const splitTerm = doc.splitTextToSize(term, pageWidth - (margin * 2));
    splitTerm.forEach((line: string) => {
      doc.text(line, margin, yPos);
      yPos += 4.5;
    });
    yPos += 2;
  });

  // Signature Section
  yPos += 15;
  
  if (yPos > 230) {
    doc.addPage();
    yPos = 20;
  }

  if (data.signatureData) {
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    yPos = addText("ASSINATURA DIGITAL", margin, yPos, { fontSize: 12, fontStyle: "bold" });
    yPos += 10;

    // Add signature image
    try {
      doc.addImage(data.signatureData, "PNG", margin, yPos, 60, 25);
    } catch (e) {
      console.error("Error adding signature image:", e);
    }
    
    yPos += 30;
    doc.line(margin, yPos, margin + 70, yPos);
    yPos += 5;
    doc.setFontSize(10);
    doc.text(data.clientName, margin, yPos);
    
    if (data.signedAt) {
      yPos += 5;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Assinado digitalmente em: ${new Date(data.signedAt).toLocaleString("pt-BR")}`, margin, yPos);
      doc.setTextColor(0, 0, 0);
    }
  } else {
    // Signature lines for manual signing
    yPos += 20;
    
    doc.line(margin, yPos, margin + 70, yPos);
    doc.text("Contratante", margin, yPos + 5);
    
    doc.line(pageWidth - margin - 70, yPos, pageWidth - margin, yPos);
    doc.text("Contratado", pageWidth - margin - 70, yPos + 5);
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(`${data.tenantName} - Contrato gerado em ${new Date().toLocaleDateString("pt-BR")}`, pageWidth / 2, footerY, { align: "center" });

  return doc.output("blob");
};

export const downloadContractPDF = async (data: ContractPDFData, filename?: string) => {
  const blob = await generateContractPDF(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `contrato-${data.clientName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
