export default function selectStyleByCondition(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }