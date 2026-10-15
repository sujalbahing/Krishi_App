import { useWindowDimensions, View } from "react-native";
import CategoryButton from "./CategoryButton";

type CategoriesSectionProps = {
  onCategoryPress: (category: string) => void;
};

const CATEGORIES = [
  { title: "Market", icon: "storefront-outline", key: "Market" },
  { title: "Services", icon: "wrench-outline", key: "Services" },
  { title: "Calculator", icon: "calculator-variant-outline", key: "Profit & Loss" },
  { title: "Diagnosis", icon: "leaf", key: "Diagnosis" },
] as const;

const SIDE_MARGIN = 20; // matches mx-5
const GAP = 12;         // matches gap-3
const MIN_BUTTON_WIDTH = 80; // smallest width where the 68pt icon still fits

export default function CategoriesSection({
  onCategoryPress,
}: CategoriesSectionProps) {
  const { width } = useWindowDimensions();
  const available = width - SIDE_MARGIN * 2;

  // Use 4 columns only if every button gets at least MIN_BUTTON_WIDTH
  const fourColumnWidth = (available - GAP * 3) / 4;
  const columns = fourColumnWidth >= MIN_BUTTON_WIDTH ? 4 : 2;
  const itemWidth = (available - GAP * (columns - 1)) / columns;

  return (
    <View
      className="mx-5 mt-5 flex-row flex-wrap"
      style={{ gap: GAP }}
    >
      {CATEGORIES.map((category) => (
        <View key={category.key} style={{ width: itemWidth }}>
          <CategoryButton
            title={category.title}
            icon={category.icon}
            onPress={() => onCategoryPress(category.key)}
          />
        </View>
      ))}
    </View>
  );
}