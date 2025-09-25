-- Create function to increment campaign amount safely
CREATE OR REPLACE FUNCTION public.increment_campaign_amount(
  campaign_id UUID,
  amount NUMERIC
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE campaigns 
  SET current_amount = current_amount + amount,
      updated_at = now()
  WHERE id = campaign_id;
END;
$$;