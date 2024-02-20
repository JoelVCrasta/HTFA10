import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
const supabaseUrl = 'https://wkagysfjztukqjhqaohh.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrYWd5c2ZqenR1a3FqaHFhb2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNzgxMzYsImV4cCI6MjAyMzk1NDEzNn0.FT25WSBZj5JmQa8wdSumc76ohUOsF4vZvAwatd4khw4';
export const supabase = createClient(supabaseUrl, supabaseKey);
