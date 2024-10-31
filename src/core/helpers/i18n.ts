import { useI18n } from "vue-i18n";

export const t = (key: string) => {
  const { t } = useI18n();
  return t(key);
};
