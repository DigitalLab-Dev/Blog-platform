-- Admin User Setup Script
-- Run this in your Supabase SQL Editor

-- Step 1: First, you need to manually create the auth user in Supabase Dashboard
-- Go to: Authentication > Users > Add user
-- Email: digitallab514@gmail.com
-- Password: Admin@123
-- After creation, copy the user ID that's generated

-- Step 2: Then run this SQL (replace the UUID with your actual user ID from Step 1)
INSERT INTO public.users (id, name, role)
VALUES (
  'YOUR-USER-ID-HERE',  -- Replace this with the UUID from Supabase Auth
  'Digital Lab Admin',
  'admin'
)
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';

-- Verify the user was created
SELECT * FROM public.users WHERE role = 'admin';
