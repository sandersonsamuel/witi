export interface Theme {
  id: string;
  name: string;
  created_by: any;
  is_ai_generated: boolean;
  is_public: boolean;
  created_at: string;
  is_default: boolean;
  meta: Meta;
}

export interface Meta {
  bg: string;
  icon: string;
  color: string;
}
