import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST() {
  try {
    // Get the current statistics row
    const { data: currentStats, error: fetchError } = await supabase
      .from('import_statistics')
      .select('*')
      .limit(1)
      .single();

    if (fetchError) {
      console.error('Error fetching statistics:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Increment the counter
    const { data: updatedStats, error: updateError } = await supabase
      .from('import_statistics')
      .update({
        import_count: currentStats.import_count + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentStats.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating statistics:', updateError);
      return NextResponse.json(
        { error: 'Failed to update statistics' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: updatedStats.import_count,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
