export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          address: string
          address_meta_data: Json
          district_id: string
          email: string | null
          full_name: string
          id: string
          phone_number: string
          province_id: string
          subward_id: string | null
          ward_id: string | null
        }
        Insert: {
          address: string
          address_meta_data: Json
          district_id: string
          email?: string | null
          full_name: string
          id?: string
          phone_number: string
          province_id: string
          subward_id?: string | null
          ward_id?: string | null
        }
        Update: {
          address?: string
          address_meta_data?: Json
          district_id?: string
          email?: string | null
          full_name?: string
          id?: string
          phone_number?: string
          province_id?: string
          subward_id?: string | null
          ward_id?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          district_id: number | null
          district_meta_data: Json | null
          id: string
          manager_id: string
          province_id: number
          province_meta_data: Json
          type: Database["public"]["Enums"]["building"]
        }
        Insert: {
          created_at?: string
          district_id?: number | null
          district_meta_data?: Json | null
          id: string
          manager_id: string
          province_id: number
          province_meta_data: Json
          type: Database["public"]["Enums"]["building"]
        }
        Update: {
          created_at?: string
          district_id?: number | null
          district_meta_data?: Json | null
          id?: string
          manager_id?: string
          province_id?: number
          province_meta_data?: Json
          type?: Database["public"]["Enums"]["building"]
        }
        Relationships: [
          {
            foreignKeyName: "locations_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "staffs"
            referencedColumns: ["id"]
          }
        ]
      }
      parcels: {
        Row: {
          created_staff: string
          current_location_id: string
          date_received: string | null
          date_sent: string
          description: string
          destination_location_id: string
          height: number | null
          id: string
          length: number | null
          origin_location_id: string
          paid_fee: number
          product_name: string
          receiver_id: string
          sender_id: string
          state: Database["public"]["Enums"]["parcel_status"]
          weight: number
          width: number | null
        }
        Insert: {
          created_staff: string
          current_location_id: string
          date_received?: string | null
          date_sent?: string
          description: string
          destination_location_id: string
          height?: number | null
          id?: string
          length?: number | null
          origin_location_id: string
          paid_fee: number
          product_name: string
          receiver_id: string
          sender_id: string
          state?: Database["public"]["Enums"]["parcel_status"]
          weight: number
          width?: number | null
        }
        Update: {
          created_staff?: string
          current_location_id?: string
          date_received?: string | null
          date_sent?: string
          description?: string
          destination_location_id?: string
          height?: number | null
          id?: string
          length?: number | null
          origin_location_id?: string
          paid_fee?: number
          product_name?: string
          receiver_id?: string
          sender_id?: string
          state?: Database["public"]["Enums"]["parcel_status"]
          weight?: number
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parcels_created_staff_fkey"
            columns: ["created_staff"]
            isOneToOne: false
            referencedRelation: "staffs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcels_current_location_id_fkey"
            columns: ["current_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcels_destination_location_id_fkey"
            columns: ["destination_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcels_origin_location_id_fkey"
            columns: ["origin_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcels_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcels_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      staffs: {
        Row: {
          created_at: string
          dob: string
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          home_town: string
          id: string
          phone_number: string
          role: Database["public"]["Enums"]["role"]
          work_place_id: string | null
        }
        Insert: {
          created_at?: string
          dob: string
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          home_town: string
          id: string
          phone_number: string
          role: Database["public"]["Enums"]["role"]
          work_place_id?: string | null
        }
        Update: {
          created_at?: string
          dob?: string
          full_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          home_town?: string
          id?: string
          phone_number?: string
          role?: Database["public"]["Enums"]["role"]
          work_place_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staffs_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staffs_work_place_id_fkey"
            columns: ["work_place_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          }
        ]
      }
      trackings: {
        Row: {
          created_at: string
          id: string
          location_id: string
          parcel_id: string
          status: Database["public"]["Enums"]["parcel_status"]
        }
        Insert: {
          created_at?: string
          id?: string
          location_id: string
          parcel_id: string
          status: Database["public"]["Enums"]["parcel_status"]
        }
        Update: {
          created_at?: string
          id?: string
          location_id?: string
          parcel_id?: string
          status?: Database["public"]["Enums"]["parcel_status"]
        }
        Relationships: [
          {
            foreignKeyName: "trackings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trackings_parcel_id_fkey"
            columns: ["parcel_id"]
            isOneToOne: false
            referencedRelation: "parcels"
            referencedColumns: ["id"]
          }
        ]
      }
      transfer_details: {
        Row: {
          id: number
          parcel_id: string
          transfer_id: string
        }
        Insert: {
          id?: number
          parcel_id: string
          transfer_id: string
        }
        Update: {
          id?: number
          parcel_id?: string
          transfer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transfer_details_parcel_id_fkey"
            columns: ["parcel_id"]
            isOneToOne: false
            referencedRelation: "parcels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_details_transfer_id_fkey"
            columns: ["transfer_id"]
            isOneToOne: false
            referencedRelation: "transfers"
            referencedColumns: ["id"]
          }
        ]
      }
      transfers: {
        Row: {
          created_staff: string
          date_transferred: string
          date_verified: string | null
          from_location_id: string
          has_verfied: boolean
          id: string
          to_location_id: string
          verified_staff: string | null
        }
        Insert: {
          created_staff: string
          date_transferred?: string
          date_verified?: string | null
          from_location_id: string
          has_verfied?: boolean
          id?: string
          to_location_id: string
          verified_staff?: string | null
        }
        Update: {
          created_staff?: string
          date_transferred?: string
          date_verified?: string | null
          from_location_id?: string
          has_verfied?: boolean
          id?: string
          to_location_id?: string
          verified_staff?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transfers_created_staff_fkey"
            columns: ["created_staff"]
            isOneToOne: false
            referencedRelation: "staffs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfers_from_location_id_fkey"
            columns: ["from_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfers_to_location_id_fkey"
            columns: ["to_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfers_verified_staff_fkey"
            columns: ["verified_staff"]
            isOneToOne: false
            referencedRelation: "staffs"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_destination_parcels_from_gd: {
        Args: {
          current_location_id_param: string
        }
        Returns: {
          id: string
          type: Database["public"]["Enums"]["building"]
          manager_id: string
          province_id: number
          district_id: number
          province_meta_data: Json
          district_meta_data: Json
          created_at: string
          count_parcels: number
        }[]
      }
      get_destination_parcels_from_tk: {
        Args: {
          current_location_id_param: string
        }
        Returns: {
          id: string
          type: Database["public"]["Enums"]["building"]
          manager_id: string
          province_id: number
          district_id: number
          province_meta_data: Json
          district_meta_data: Json
          created_at: string
          count_parcels: number
        }[]
      }
    }
    Enums: {
      building: "tap_ket" | "giao_dich"
      gender: "male" | "female"
      parcel_status:
        | "đã nhận từ khách hàng"
        | "đang chuyển đến điểm tập kết gửi"
        | "đã nhận từ điểm giao dịch gửi"
        | "đang chuyển đến điểm tập kết đích"
        | "đã nhận từ điểm tập kết gửi"
        | "đang chuyển đến điểm giao dịch đích"
        | "sẵn sàng giao hàng"
        | "đã giao"
        | "đã trả lại điểm tập kết đích"
      role: "leader" | "tk_admin" | "gd_admin" | "tk_staff" | "gd_staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
