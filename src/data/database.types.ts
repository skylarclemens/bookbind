export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      books: {
        Row: {
          authors: string[] | null
          book_type: string | null
          categories: string[] | null
          created_at: string
          google_id: string | null
          id: string
          images: Json | null
          isbn: Json | null
          page_count: number | null
          published_date: string | null
          publisher: string | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          authors?: string[] | null
          book_type?: string | null
          categories?: string[] | null
          created_at?: string
          google_id?: string | null
          id?: string
          images?: Json | null
          isbn?: Json | null
          page_count?: number | null
          published_date?: string | null
          publisher?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          authors?: string[] | null
          book_type?: string | null
          categories?: string[] | null
          created_at?: string
          google_id?: string | null
          id?: string
          images?: Json | null
          isbn?: Json | null
          page_count?: number | null
          published_date?: string | null
          publisher?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          book_id: string | null
          created_at: string
          id: string
          rating: number | null
          text: string | null
          user_id: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          text?: string | null
          user_id?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_book: {
        Row: {
          book_id: string | null
          created_at: string
          end_date: string | null
          id: string
          most_recent_activity: string | null
          review: string | null
          shelf: string | null
          start_date: string | null
          status: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          most_recent_activity?: string | null
          review?: string | null
          shelf?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          most_recent_activity?: string | null
          review?: string | null
          shelf?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_book_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_book_most_recent_activity_fkey"
            columns: ["most_recent_activity"]
            isOneToOne: false
            referencedRelation: "user_book_activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_book_review_fkey"
            columns: ["review"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_book_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_book_activity: {
        Row: {
          amount: number | null
          created_at: string
          date: string | null
          details: string | null
          id: string
          type: string | null
          user_book_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          date?: string | null
          details?: string | null
          id?: string
          type?: string | null
          user_book_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          date?: string | null
          details?: string | null
          id?: string
          type?: string | null
          user_book_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_book_activity_user_book_id_fkey"
            columns: ["user_book_id"]
            isOneToOne: false
            referencedRelation: "user_book"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
