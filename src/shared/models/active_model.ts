export interface ActiveModel {
  id: number;
  name: string;
  description: string;
  value: number;
  status?: string;
  companyId?: number;
  categoryId?: number;
  areaId?: number;
  custodianId?: number;
  locationId?: number;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string | null;
  updatedAt?: string | null;
}
