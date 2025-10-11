-- Create import statistics table
-- This table tracks the total number of calendar imports
CREATE TABLE IF NOT EXISTS import_statistics (
  id SERIAL PRIMARY KEY,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  import_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Insert initial row if table is empty
INSERT INTO import_statistics (start_date, import_count)
SELECT NOW(), 0
WHERE NOT EXISTS (SELECT 1 FROM import_statistics LIMIT 1);

-- Create index on id for faster lookups (though we only have one row)
CREATE INDEX IF NOT EXISTS idx_import_statistics_id ON import_statistics(id);

-- Add comment to table
COMMENT ON TABLE import_statistics IS 'Tracks the total number of calendar imports since a specific date';
COMMENT ON COLUMN import_statistics.start_date IS 'The date when counting started';
COMMENT ON COLUMN import_statistics.import_count IS 'Total number of successful calendar imports';
