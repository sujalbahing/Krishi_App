import { View } from "react-native";
import CategoryButton from "./CategoryButton";

type CategoriesSectionProps = {
  onCategoryPress: (category: string) => void;
};

export default function CategoriesSection({
  onCategoryPress,
}: CategoriesSectionProps) {
  return (
    <View className="mx-5 mt-5 flex-row gap-3">
      <CategoryButton
        title="Market"
        icon="storefront-outline"
        onPress={() => onCategoryPress("Market")}
      />

      <CategoryButton
        title="Services"
        icon="wrench-outline"
        onPress={() => onCategoryPress("Services")}
      />

      <CategoryButton
        title={"Calculator"}
        icon="calculator-variant-outline"
        onPress={() => onCategoryPress("Profit & Loss")}
      />

      <CategoryButton
        title="Diagnosis"
        icon="leaf"
        onPress={() => onCategoryPress("Diagnosis")}
      />
    </View>
  );
}