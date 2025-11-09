import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export const getAdminStats = async (req: AuthRequest, res: Response) => {
  try {
    // Get total sales
    const orders = await prisma.order.findMany({
      where: {
        status: {
          not: 'CANCELLED',
        },
      },
    });
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    // Get total orders count
    const totalOrders = await prisma.order.count();

    // Get total products count
    const totalProducts = await prisma.product.count({
      where: { isActive: true },
    });

    // Get total customers count
    const totalCustomers = await prisma.user.count({
      where: { role: 'USER' },
    });

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Get order status breakdown
    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      _count: true,
    });

    res.json({
      totalSales,
      totalOrders,
      totalProducts,
      totalCustomers,
      recentOrders,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
