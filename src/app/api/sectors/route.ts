import { NextResponse } from 'next/server';
import { GICS_SECTORS } from '@/lib/constants/sectors';

export async function GET() {
  return NextResponse.json(GICS_SECTORS);
}
