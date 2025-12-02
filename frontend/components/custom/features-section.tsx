import { CheckIcon, ClockIcon, CloudIcon } from "lucide-react";
import { StrapiFeature } from "@/types";

export interface FeaturesSectionProps {
    id: number;
    __component: string;
    title: string;
    description: string;
    features: StrapiFeature[];
}

function getIcon(name: string) {
    const iconProps = { className: "w-6 h-6 text-primary" };
    switch (name) {
        case "CLOCK_ICON":
            return <ClockIcon {...iconProps} />;
        case "CHECK_ICON":
            return <CheckIcon {...iconProps} />;
        case "CLOUD_ICON":
            return <CloudIcon {...iconProps} />;
        default:
            return <CheckIcon {...iconProps} />;
    }
}

export function FeaturesSection({ data }: { readonly data: FeaturesSectionProps }) {
    if (!data) return null;

    const { title, description, features } = data;

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {title}
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col items-start p-6 bg-card rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                {getIcon(item.icon)}
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-card-foreground">
                                {item.heading}
                            </h3>

                            <p className="text-muted-foreground leading-relaxed">
                                {item.sub_heading}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}