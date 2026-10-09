import type { IconType } from 'react-icons/lib';

export type StatsType = {
    accent: string
    title: string
    value: string
    unit: string
    description: string
    iconBg: string
    iconColor: string
    Icon: IconType
}

function Stats({ accent, title, value, unit, description, iconBg, iconColor, Icon }: StatsType) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* نوار رنگی بالای کارت */}
            <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} />

            <div className="flex items-start justify-between gap-3">
                {/* عنوان و مقدار */}
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <div className="mt-4 flex flex-wrap items-baseline gap-1.5">
                        <span className="wrap-break-word text-2xl font-extrabold tracking-tight text-gray-800 sm:text-3xl">
                            {value}
                        </span>

                        {unit && (
                            <span className="text-xs font-medium text-gray-400">
                                {unit}
                            </span>
                        )}
                    </div>
                </div>

                {/* آیکون */}
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110`}
                >
                    <Icon size={25} />
                </div>
            </div>

            {/* توضیحات */}
            <div className="mt-5 border-t border-gray-100 pt-3">
                <p className="text-xs leading-6 text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Stats;