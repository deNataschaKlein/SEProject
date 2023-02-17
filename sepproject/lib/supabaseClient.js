import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://lydefvusgrjgnrolysfm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZGVmdnVzZ3JqZ25yb2x5c2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NDA0ODMsImV4cCI6MTk5MjIxNjQ4M30.yH3gqxRdV4qA1TQSLSQLNCLcugrdxXpANDgfw-8wVNY')