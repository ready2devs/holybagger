import { NextRequest, NextResponse } from 'next/server';
import { getStockScreener, getProfile, getHistoricalPriceFull } from '@/lib/api/fmp';
import prisma from '@/lib/db/prisma';
import { calculateMultiplication } from '@/lib/utils/calculations';
import { AssetType } from '@prisma/client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'ALL';
  const sector = searchParams.get('sector') || 'ALL';
  const exchange = searchParams.get('exchange') || 'ALL';
  const country = searchParams.get('country') || 'ALL';
  const minMultiplier = Number(searchParams.get('minMultiplier') || '5');
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');
  const sortBy = searchParams.get('sortBy') || 'multiplication';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  try {
    // 1. In a real app with high rate limits, we would query FMP here.
    // Given the 250 req/day limit, we'll query the database first to see if we have 
    // any assets matching the criteria that were updated recently.
    
    // For MVP phase, let's implement the DB query logic directly 
    // and rely on a background seed script to populate the DB, OR we fetch FMP if DB is empty.

    const whereClause: any = {
      isActive: true,
      multiplication: { gte: minMultiplier }
    };

    if (type !== 'ALL') whereClause.type = type as AssetType;
    if (sector !== 'ALL') whereClause.sector = sector;
    if (exchange !== 'ALL') whereClause.exchange = exchange;
    if (country !== 'ALL') whereClause.country = country;

    // Check DB first
    const totalCount = await prisma.asset.count({ where: whereClause });

    // If we have data, return it
    if (totalCount > 0) {
      const assets = await prisma.asset.findMany({
        where: whereClause,
        orderBy: {
          [sortBy]: sortOrder
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return NextResponse.json({
        data: assets,
        total: totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
        cached: true,
      });
    }

    // If DB is empty, this is where we'd call FMP.
    // However, calling FMP stock-screener + historical prices for 50+ stocks 
    // would instantly burn the 250 req/day limit.
    // For the MVP, if the DB is empty, we'll return an empty list 
    // and instruct the user to run the seed script.
    return NextResponse.json({
      data: [],
      total: 0,
      page: 1,
      totalPages: 0,
      cached: false,
      message: "No data found. Please run the seed script to populate the database from FMP."
    });

  } catch (error) {
    console.error("Screener API error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
