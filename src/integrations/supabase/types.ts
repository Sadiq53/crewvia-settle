export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      workspace_accounts: {
        Row: {
          active: boolean
          business_id: string | null
          created_at: string
          id: string
          kind: string
          name: string
          opening_balance_minor: number
          owner_id: string
          party_id: string | null
        }
        Insert: {
          active?: boolean
          business_id?: string | null
          created_at?: string
          id?: string
          kind: string
          name: string
          opening_balance_minor?: number
          owner_id?: string
          party_id?: string | null
        }
        Update: {
          active?: boolean
          business_id?: string | null
          created_at?: string
          id?: string
          kind?: string
          name?: string
          opening_balance_minor?: number
          owner_id?: string
          party_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_accounts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "workspace_businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_accounts_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "workspace_parties"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_businesses: {
        Row: {
          code: string
          created_at: string
          id: string
          kind: string
          name: string
          owner_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          kind: string
          name: string
          owner_id?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          kind?: string
          name?: string
          owner_id?: string
        }
        Relationships: []
      }
      workspace_calculation_periods: {
        Row: {
          created_at: string
          id: string
          label: string
          owner_id: string
          period_end: string
          period_start: string
          rule_snapshot: Json
          status: string
          transaction_snapshot: Json
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          owner_id?: string
          period_end: string
          period_start: string
          rule_snapshot: Json
          status?: string
          transaction_snapshot: Json
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          owner_id?: string
          period_end?: string
          period_start?: string
          rule_snapshot?: Json
          status?: string
          transaction_snapshot?: Json
        }
        Relationships: []
      }
      workspace_calculation_results: {
        Row: {
          advance_minor: number
          business_id: string | null
          created_at: string
          entitlement_minor: number
          explanation: Json
          id: string
          net_position_minor: number
          owner_id: string
          party_id: string
          period_id: string
          received_minor: number
          settled_minor: number
        }
        Insert: {
          advance_minor?: number
          business_id?: string | null
          created_at?: string
          entitlement_minor?: number
          explanation: Json
          id?: string
          net_position_minor?: number
          owner_id?: string
          party_id: string
          period_id: string
          received_minor?: number
          settled_minor?: number
        }
        Update: {
          advance_minor?: number
          business_id?: string | null
          created_at?: string
          entitlement_minor?: number
          explanation?: Json
          id?: string
          net_position_minor?: number
          owner_id?: string
          party_id?: string
          period_id?: string
          received_minor?: number
          settled_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "workspace_calculation_results_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "workspace_businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_calculation_results_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "workspace_parties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_calculation_results_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "workspace_calculation_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_categories: {
        Row: {
          active: boolean
          created_at: string
          id: string
          kind: string
          name: string
          owner_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          name: string
          owner_id?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          kind?: string
          name?: string
          owner_id?: string
        }
        Relationships: []
      }
      workspace_distribution_rules: {
        Row: {
          active: boolean
          created_at: string
          effective_from: string
          id: string
          name: string
          owner_id: string
          scope: string
          version: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          effective_from: string
          id?: string
          name: string
          owner_id?: string
          scope: string
          version?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          effective_from?: string
          id?: string
          name?: string
          owner_id?: string
          scope?: string
          version?: number
        }
        Relationships: []
      }
      workspace_obligations: {
        Row: {
          amount_minor: number
          created_at: string
          creditor_party_id: string
          debtor_party_id: string
          id: string
          owner_id: string
          period_id: string
          settled_minor: number
        }
        Insert: {
          amount_minor: number
          created_at?: string
          creditor_party_id: string
          debtor_party_id: string
          id?: string
          owner_id?: string
          period_id: string
          settled_minor?: number
        }
        Update: {
          amount_minor?: number
          created_at?: string
          creditor_party_id?: string
          debtor_party_id?: string
          id?: string
          owner_id?: string
          period_id?: string
          settled_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "workspace_obligations_creditor_party_id_fkey"
            columns: ["creditor_party_id"]
            isOneToOne: false
            referencedRelation: "workspace_parties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_obligations_debtor_party_id_fkey"
            columns: ["debtor_party_id"]
            isOneToOne: false
            referencedRelation: "workspace_parties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_obligations_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "workspace_calculation_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_parties: {
        Row: {
          active: boolean
          contact: string | null
          created_at: string
          id: string
          kind: string
          name: string
          notes: string | null
          owner_id: string
          tag: string | null
        }
        Insert: {
          active?: boolean
          contact?: string | null
          created_at?: string
          id?: string
          kind: string
          name: string
          notes?: string | null
          owner_id?: string
          tag?: string | null
        }
        Update: {
          active?: boolean
          contact?: string | null
          created_at?: string
          id?: string
          kind?: string
          name?: string
          notes?: string | null
          owner_id?: string
          tag?: string | null
        }
        Relationships: []
      }
      workspace_rule_members: {
        Row: {
          created_at: string
          id: string
          owner_id: string
          parent_member_id: string | null
          party_id: string
          percentage_basis: number
          rule_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          owner_id?: string
          parent_member_id?: string | null
          party_id: string
          percentage_basis: number
          rule_id: string
        }
        Update: {
          created_at?: string
          id?: string
          owner_id?: string
          parent_member_id?: string | null
          party_id?: string
          percentage_basis?: number
          rule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_rule_members_parent_member_id_fkey"
            columns: ["parent_member_id"]
            isOneToOne: false
            referencedRelation: "workspace_rule_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_rule_members_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "workspace_parties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_rule_members_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "workspace_distribution_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_settlements: {
        Row: {
          amount_minor: number
          created_at: string
          id: string
          notes: string | null
          obligation_id: string
          owner_id: string
          payment_method: string | null
          settled_on: string
        }
        Insert: {
          amount_minor: number
          created_at?: string
          id?: string
          notes?: string | null
          obligation_id: string
          owner_id?: string
          payment_method?: string | null
          settled_on: string
        }
        Update: {
          amount_minor?: number
          created_at?: string
          id?: string
          notes?: string | null
          obligation_id?: string
          owner_id?: string
          payment_method?: string | null
          settled_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_settlements_obligation_id_fkey"
            columns: ["obligation_id"]
            isOneToOne: false
            referencedRelation: "workspace_obligations"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_transactions: {
        Row: {
          amount_minor: number
          business_id: string | null
          category_id: string | null
          created_at: string
          description: string
          destination_account_id: string | null
          id: string
          notes: string | null
          occurred_on: string
          owner_id: string
          payee_party_id: string | null
          reversal_of: string | null
          source_account_id: string | null
          transaction_type: string
          updated_at: string
        }
        Insert: {
          amount_minor: number
          business_id?: string | null
          category_id?: string | null
          created_at?: string
          description: string
          destination_account_id?: string | null
          id?: string
          notes?: string | null
          occurred_on: string
          owner_id?: string
          payee_party_id?: string | null
          reversal_of?: string | null
          source_account_id?: string | null
          transaction_type: string
          updated_at?: string
        }
        Update: {
          amount_minor?: number
          business_id?: string | null
          category_id?: string | null
          created_at?: string
          description?: string
          destination_account_id?: string | null
          id?: string
          notes?: string | null
          occurred_on?: string
          owner_id?: string
          payee_party_id?: string | null
          reversal_of?: string | null
          source_account_id?: string | null
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "workspace_businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "workspace_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_transactions_destination_account_id_fkey"
            columns: ["destination_account_id"]
            isOneToOne: false
            referencedRelation: "workspace_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_transactions_payee_party_id_fkey"
            columns: ["payee_party_id"]
            isOneToOne: false
            referencedRelation: "workspace_parties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_transactions_reversal_of_fkey"
            columns: ["reversal_of"]
            isOneToOne: false
            referencedRelation: "workspace_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_transactions_source_account_id_fkey"
            columns: ["source_account_id"]
            isOneToOne: false
            referencedRelation: "workspace_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
