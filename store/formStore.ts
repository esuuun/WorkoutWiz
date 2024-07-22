import create from 'zustand'

interface FormData {
    goal: string,
    gender: string,
    level: string,
    height: string,
    weight: string,
    howOften:string,
    where:string,
    additionalProblem : string,
}

interface FormStore {
    formData: FormData;
    setFormData: (data: Partial<FormData>) => void;
  }
  
  const useFormStore = create<FormStore>((set) => ({
    formData: {
        goal: "",
        gender: "",
        level: "",
        height: "",
        weight: "",
      howOften: "",
      where: "",
      additionalProblem : "",
    },
    setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  }));
  
  export default useFormStore;