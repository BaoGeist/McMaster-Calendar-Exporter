import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  try {
    // Get the statistics row
    const { data, error } = await supabase
      .from('import_statistics')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching statistics:', error);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      startDate: data.start_date,
      importCount: data.import_count,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
