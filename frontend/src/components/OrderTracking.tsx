'use client';

interface OrderTrackingProps {
  status: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export default function OrderTracking({
  status,
  trackingNumber,
  carrier,
  estimatedDelivery,
  createdAt,
}: OrderTrackingProps) {
  const steps = [
    { key: 'PENDING', label: 'Order Placed', icon: '📋' },
    { key: 'PROCESSING', label: 'Processing', icon: '⚙️' },
    { key: 'SHIPPED', label: 'Shipped', icon: '📦' },
    { key: 'DELIVERED', label: 'Delivered', icon: '✅' },
  ];

  const statusOrder = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  const currentIndex = statusOrder.indexOf(status);
  const isCancelled = status === 'CANCELLED';

  return (
    <div className="bg-dark-800 rounded-xl p-6 border border-dark-600">
      <h3 className="text-xl font-bold text-white mb-6">Order Tracking</h3>

      {isCancelled ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-red-400 text-lg font-semibold">Order Cancelled</p>
          <p className="text-gray-400 text-sm mt-2">This order has been cancelled</p>
        </div>
      ) : (
        <>
          {/* Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-dark-600"></div>
            <div
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-purple-500 to-purple-600 transition-all duration-500"
              style={{ height: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={step.key} className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-br from-purple-600 to-purple-700 ring-4 ring-purple-500/30'
                          : 'bg-dark-700 border-2 border-dark-600'
                      } ${isCurrent ? 'animate-pulse' : ''}`}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h4
                        className={`font-semibold mb-1 ${
                          isCompleted ? 'text-white' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <p className="text-purple-400 text-sm font-medium">In Progress</p>
                      )}
                      {isCompleted && !isCurrent && (
                        <p className="text-gray-400 text-sm">Completed</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracking Info */}
          {trackingNumber && (
            <div className="mt-8 pt-6 border-t border-dark-600">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tracking Number:</span>
                  <span className="text-white font-mono font-semibold">{trackingNumber}</span>
                </div>
                {carrier && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Carrier:</span>
                    <span className="text-white font-semibold">{carrier}</span>
                  </div>
                )}
                {estimatedDelivery && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Delivery:</span>
                    <span className="text-white font-semibold">
                      {new Date(estimatedDelivery).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Date */}
          <div className="mt-6 pt-6 border-t border-dark-600">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Order Date:</span>
              <span className="text-white">
                {new Date(createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
