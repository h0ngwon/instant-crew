export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            comment: {
                Row: {
                    content: string;
                    created_at: string;
                    id: string;
                    post_id: string | null;
                    user_id: string | null;
                };
                Insert: {
                    content: string;
                    created_at?: string;
                    id?: string;
                    post_id?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    content?: string;
                    created_at?: string;
                    id?: string;
                    post_id?: string | null;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'comment_post_id_fkey';
                        columns: ['post_id'];
                        isOneToOne: false;
                        referencedRelation: 'post';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'comment_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'user';
                        referencedColumns: ['id'];
                    },
                ];
            };
            post: {
                Row: {
                    category: string;
                    content: string;
                    created_at: string;
                    date: string;
                    id: string;
                    location: string | null;
                    picture: string | null;
                    title: string;
                    user_id: string | null;
                    address: string;
                };
                Insert: {
                    category: string;
                    content: string;
                    created_at?: string;
                    date: string;
                    id?: string;
                    location?: string | null;
                    picture?: string | null;
                    title: string;
                    user_id?: string | null;
                };
                Update: {
                    category?: string;
                    content?: string;
                    created_at?: string;
                    date?: string;
                    id?: string;
                    location?: string | null;
                    picture?: string | null;
                    title?: string;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'post_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'user';
                        referencedColumns: ['id'];
                    },
                ];
            };
            user: {
                Row: {
                    email: string;
                    id: string;
                    nickname: string;

                    profile_pic: string | null;
                };
                Insert: {
                    email: string;
                    id?: string;
                    nickname: string;

                    profile_pic?: string | null;
                };
                Update: {
                    email?: string;
                    id?: string;
                    nickname?: string;

                    profile_pic?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database['public']['Tables'] & Database['public']['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
          Database['public']['Views'])
    ? (Database['public']['Tables'] &
          Database['public']['Views'])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof Database['public']['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof Database['public']['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof Database['public']['Enums']
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
