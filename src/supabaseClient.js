import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xaunazzalwylgidfghtf.supabase.co"; // Вставь свой URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhdW5henphbHd5bGdpZGZnaHRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDY4MjQzOCwiZXhwIjoyMDY2MjU4NDM4fQ.z2ZyGETMLJbjWwc7EPmgWcfdVEVjWpiLbAylItGy2_w"; // Вставь свой API Key

export const supabase = createClient(supabaseUrl, supabaseKey);
