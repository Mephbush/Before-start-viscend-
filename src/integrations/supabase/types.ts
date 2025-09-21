@@ .. @@
       contact_inquiries: {
         Row: {
           company: string | null
           created_at: string
           email: string
           id: string
           message: string
           name: string
           phone: string | null
           preferred_language: string | null
           service_type: string | null
           status: string | null
         }
         Insert: {
           company?: string | null
           created_at?: string
           email: string
           id?: string
           message: string
           name: string
           phone?: string | null
           preferred_language?: string | null
           service_type?: string | null
           status?: string | null
         }
         Update: {
           company?: string | null
           created_at?: string
           email?: string
           id?: string
           message?: string
           name?: string
           phone?: string | null
           preferred_language?: string | null
           service_type?: string | null
           status?: string | null
         }
         Relationships: []
       }
+      page_visits: {
+        Row: {
+          created_at: string
+          id: string
+          page_path: string
+          page_title: string | null
+          scroll_depth: number | null
+          session_id: string | null
+          time_on_page: number | null
+          visit_time: string
+        }
+        Insert: {
+          created_at?: string
+          id?: string
+          page_path: string
+          page_title?: string | null
+          scroll_depth?: number | null
+          session_id?: string | null
+          time_on_page?: number | null
+          visit_time?: string
+        }
+        Update: {
+          created_at?: string
+          id?: string
+          page_path?: string
+          page_title?: string | null
+          scroll_depth?: number | null
+          session_id?: string | null
+          time_on_page?: number | null
+          visit_time?: string
+        }
+        Relationships: [
+          {
+            foreignKeyName: "page_visits_session_id_fkey"
+            columns: ["session_id"]
+            isOneToOne: false
+            referencedRelation: "visitor_sessions"
+            referencedColumns: ["id"]
+          },
+        ]
+      }
       portfolio_items: {
         Row: {
           category: string
           created_at: string
           description_ar: string | null
           description_en: string | null
           featured: boolean | null
           id: string
           image_url: string | null
           project_url: string | null
           service_type: string
           technologies: string[] | null
           title_ar: string | null
           title_en: string
           updated_at: string
         }
         Insert: {
           category: string
           created_at?: string
           description_ar?: string | null
           description_en?: string | null
           featured?: boolean | null
           id?: string
           image_url?: string | null
           project_url?: string | null
           service_type: string
           technologies?: string[] | null
           title_ar?: string | null
           title_en: string
           updated_at?: string
         }
         Update: {
           category?: string
           created_at?: string
           description_ar?: string | null
           description_en?: string | null
           featured?: boolean | null
           id?: string
           image_url?: string | null
           project_url?: string | null
           service_type?: string
           technologies?: string[] | null
           title_ar?: string | null
           title_en?: string
           updated_at?: string
         }
         Relationships: []
       }
+      site_analytics: {
+        Row: {
+          avg_session_duration: number | null
+          bounce_rate: number | null
+          created_at: string
+          date: string
+          id: string
+          total_page_views: number | null
+          total_visitors: number | null
+          unique_visitors: number | null
+          updated_at: string
+        }
+        Insert: {
+          avg_session_duration?: number | null
+          bounce_rate?: number | null
+          created_at?: string
+          date?: string
+          id?: string
+          total_page_views?: number | null
+          total_visitors?: number | null
+          unique_visitors?: number | null
+          updated_at?: string
+        }
+        Update: {
+          avg_session_duration?: number | null
+          bounce_rate?: number | null
+          created_at?: string
+          date?: string
+          id?: string
+          total_page_views?: number | null
+          total_visitors?: number | null
+          unique_visitors?: number | null
+          updated_at?: string
+        }
+        Relationships: []
+      }
+      visitor_sessions: {
+        Row: {
+          browser: string | null
+          city: string | null
+          country: string | null
+          created_at: string
+          device_type: string | null
+          first_visit: string | null
+          id: string
+          ip_address: string | null
+          is_active: boolean | null
+          landing_page: string | null
+          language: string | null
+          last_visit: string | null
+          os: string | null
+          referrer: string | null
+          session_duration: number | null
+          session_id: string
+          total_page_views: number | null
+          total_visits: number | null
+          updated_at: string
+          user_agent: string | null
+        }
+        Insert: {
+          browser?: string | null
+          city?: string | null
+          country?: string | null
+          created_at?: string
+          device_type?: string | null
+          first_visit?: string | null
+          id?: string
+          ip_address?: string | null
+          is_active?: boolean | null
+          landing_page?: string | null
+          language?: string | null
+          last_visit?: string | null
+          os?: string | null
+          referrer?: string | null
+          session_duration?: number | null
+          session_id: string
+          total_page_views?: number | null
+          total_visits?: number | null
+          updated_at?: string
+          user_agent?: string | null
+        }
+        Update: {
+          browser?: string | null
+          city?: string | null
+          country?: string | null
+          created_at?: string
+          device_type?: string | null
+          first_visit?: string | null
+          id?: string
+          ip_address?: string | null
+          is_active?: boolean | null
+          landing_page?: string | null
+          language?: string | null
+          last_visit?: string | null
+          os?: string | null
+          referrer?: string | null
+          session_duration?: number | null
+          session_id?: string
+          total_page_views?: number | null
+          total_visits?: number | null
+          updated_at?: string
+          user_agent?: string | null
+        }
+        Relationships: []
+      }
     }
     Views: {
       [_ in never]: never
     }
     Functions: {
+      increment_page_views: {
+        Args: {
+          session_uuid: string
+        }
+        Returns: number
+      }
+      update_daily_analytics: {
+        Args: Record<PropertyKey, never>
+        Returns: undefined
+      }
       [_ in never]: never
     }
     Enums: {