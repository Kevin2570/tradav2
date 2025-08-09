export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST() {
  try {
    // Clear existing data
    await prisma.message.deleteMany();
    await prisma.matchThread.deleteMany();
    await prisma.offer.deleteMany();
    await prisma.want.deleteMany();
    await prisma.user.deleteMany();

    // Create sample users with offers and wants
    const users = [
      {
        email: 'alex@example.com',
        name: 'Alex Chen',
        borough: 'Manhattan',
        matchStyle: 'Open-Ended',
        offers: ['Web design', 'Photography', 'Guitar lessons'],
        wants: ['Dog walking', 'Cooking lessons', 'Moving help']
      },
      {
        email: 'maria@example.com',
        name: 'Maria Rodriguez',
        borough: 'Brooklyn',
        matchStyle: 'Strict',
        offers: ['Dog walking', 'Spanish tutoring', 'Yoga classes'],
        wants: ['Web design', 'Photography']
      },
      {
        email: 'david@example.com',
        name: 'David Kim',
        borough: 'Queens',
        matchStyle: 'Open-Ended',
        offers: ['Cooking lessons', 'Piano lessons', 'Tax preparation'],
        wants: ['Guitar lessons', 'Moving help', 'Bike repair']
      },
      {
        email: 'sarah@example.com',
        name: 'Sarah Johnson',
        borough: 'Manhattan',
        matchStyle: 'Open-Ended',
        offers: ['Moving help', 'Resume writing', 'Plant care'],
        wants: ['Yoga classes', 'Spanish tutoring', 'Photography']
      },
      {
        email: 'mike@example.com',
        name: 'Mike Thompson',
        borough: 'Brooklyn',
        matchStyle: 'Strict',
        offers: ['Bike repair', 'Carpentry', 'Math tutoring'],
        wants: ['Piano lessons', 'Tax preparation']
      }
    ];

    for (const userData of users) {
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          borough: userData.borough,
          matchStyle: userData.matchStyle,
        },
      });

      // Create offers
      for (const offerText of userData.offers) {
        await prisma.offer.create({
          data: {
            text: offerText,
            userId: user.id,
          },
        });
      }

      // Create wants
      for (const wantText of userData.wants) {
        await prisma.want.create({
          data: {
            text: wantText,
            userId: user.id,
          },
        });
      }
    }

    return NextResponse.json({ 
      message: 'Database seeded successfully!',
      usersCreated: users.length 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Failed to seed database',
      details: error.message 
    }, { status: 500 });
  }
}