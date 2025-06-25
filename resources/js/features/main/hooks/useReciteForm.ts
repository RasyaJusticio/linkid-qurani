import { TFunction } from "i18next";
import { useReciteFormSchema } from "../schemas/reciteFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useReciteForm = (t: TFunction<'main-page'>) => {
    const formSchema = useReciteFormSchema(t);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selection: "group",
            type: "tahsin",
            unit: "chapter"
        }
    })

    return { form, formSchema };
}
