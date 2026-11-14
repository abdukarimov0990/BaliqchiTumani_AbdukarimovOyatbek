import type { ReactNode } from "react";
import type { Material, MaterialField } from "../types/material";
import { formatPrice, formatRegion } from "../utils/format";
import { getIssue } from "../utils/materials";

interface MaterialTableProps {
  materials: Material[];
}

interface CheckedCellProps {
  material: Material;
  field: MaterialField;
  children: ReactNode;
}

function CheckedCell({ material, field, children }: CheckedCellProps) {
  const issue = getIssue(material, field);
  if (!issue) return <td>{children}</td>;

  return (
    <td className="needs-check" title={issue.note}>
      {children} ⚠
    </td>
  );
}

export function MaterialTable({ materials }: MaterialTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Kod</th>
          <th>Nomi</th>
          <th>Toifa</th>
          <th>Miqdor</th>
          <th>Narx</th>
          <th>Hudud</th>
        </tr>
      </thead>
      <tbody>
        {materials.map((material) => (
          <tr key={material.id}>
            <td>{material.id}</td>
            <td>{material.name}</td>
            <td>{material.category}</td>
            <td>
              {material.quantity} {material.unit}
            </td>
            <CheckedCell material={material} field="price">
              {formatPrice(material.price)}
            </CheckedCell>
            <CheckedCell material={material} field="region">
              {formatRegion(material.region)}
            </CheckedCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
