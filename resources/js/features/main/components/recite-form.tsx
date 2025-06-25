import { Group } from "@/types/models/Group";
import { User } from "@/types/models/User";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useReciteForm } from "../hooks/useReciteForm"; import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComboBox } from "@/components/ui/combobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QURAN_PAGES } from "../constants/quranPages";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/models/Chapter";
import { Juz } from "@/types/models/Juz";

type ReciteFormProps = {
    groups: Group[];
    friends: User[];
    chapters: Chapter[];
    juzs: Juz[];
}

const ReciteForm: React.FC<ReciteFormProps> = ({ groups, friends, chapters, juzs }) => {
    const { t } = useTranslation('main-page');

    const { form } = useReciteForm(t);

    const currentSelection = form.watch('selection');
    const currentUnit = form.watch('unit');

    useEffect(() => {
        form.setValue('userId', '');
    }, [form, currentSelection]);

    return (
        <Form {...form}>
            <form className="space-y-6">
                <h2 className="text-2xl font-semibold">{t('recite-form.title')}</h2>

                <FormField
                    control={form.control}
                    name="selection"
                    render={({ field }) => (
                        <FormItem className="gap-4 sm:grid-cols-5">
                            <FormLabel>{t('recite-form.labels.selection')}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-8"
                                >
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="group" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                           {t('recite-form.values.selection.group')}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="friend" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                           {t('recite-form.values.selection.friend')}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {currentSelection === "group" ? (
                    <>
                        <FormField
                            control={form.control}
                            name="groupId"
                            render={({ field }) => (
                                <FormItem className="gap-4 sm:grid-cols-5">
                                    <FormLabel>{t('recite-form.labels.groupId')}</FormLabel>
                                    <FormControl className="col-span-4">
                                        <ComboBox items={groups.map((group) => ({ value: String(group.group_id), label: group.group_title }))} className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem className="gap-4 sm:grid-cols-5">
                                    <FormLabel>{t('recite-form.labels.userId')}</FormLabel>
                                    <FormControl className="col-span-4">
                                        <ComboBox items={groups.map((group) => ({ value: String(group.group_id), label: group.group_title }))} className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                ) : (
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem className="gap-4 sm:grid-cols-5">
                                <FormLabel>{t('recite-form.labels.friendId')}</FormLabel>
                                <FormControl className="col-span-4">
                                    <ComboBox items={friends.map((friend) => ({ value: String(friend.user_id), label: `${friend.user_firstname} ${friend.user_lastname}` }))} className="w-full" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="gap-4 sm:grid-cols-5">
                            <FormLabel>{t('recite-form.labels.type')}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-8"
                                >
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="tahsin" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                           {t('recite-form.values.type.tahsin')}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="tahfidz" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                           {t('recite-form.values.type.tahfidz')}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                        <FormItem className="gap-4 sm:grid-cols-5">
                            <FormLabel>{t('recite-form.labels.unit')}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-8"
                                >
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="chapter" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                           {t('recite-form.values.unit.chapter')}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="juz" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                           {t('recite-form.values.unit.juz')}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="page" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                           {t('recite-form.values.unit.page')}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {currentUnit === "chapter" && (
                    <>
                        <FormField
                            control={form.control}
                            name="chapterId"
                            render={({ field }) => (
                                <FormItem className="gap-4 sm:grid-cols-5">
                                    <FormLabel>{t('recite-form.labels.chapterId')}</FormLabel>
                                    <FormControl className="col-span-4">
                                        <ComboBox items={chapters.map((chapter) => ({ value: String(chapter.id), label: `${chapter.name_simple} (${chapter.id})` }))} className="w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-5">
                            <div></div>
                            <div className="grid col-span-5 grid-cols-2 sm:col-span-4 gap-1 sm:gap-2 sm:grid-cols-4">
                                <Button type="button" variant="outline" onClick={() => form.setValue("chapterId", "1")}>{t('recite-form.quick-select.alfatihah')}</Button>
                                <Button type="button" variant="outline" onClick={() => form.setValue("chapterId", "36")}>{t('recite-form.quick-select.yasin')}</Button>
                                <Button type="button" variant="outline" onClick={() => form.setValue("chapterId", "112")}>{t('recite-form.quick-select.alikhlas')}</Button>
                                <Button type="button" variant="outline" onClick={() => form.setValue("chapterId", "114")}>{t('recite-form.quick-select.annas')}</Button>
                            </div>
                        </div>
                    </>
                )}

                {currentUnit === "juz" && (
                    <FormField
                        control={form.control}
                        name="juzId"
                        render={({ field }) => (
                            <FormItem className="gap-4 sm:grid-cols-5">
                                <FormLabel>{t('recite-form.labels.juzId')}</FormLabel>
                                <FormControl className="col-span-4">
                                    <ComboBox items={juzs.map((juz) => ({ value: String(juz.id), label: String(juz.id) }))} className="w-full" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {currentUnit === "page" && (
                    <FormField
                        control={form.control}
                        name="pageId"
                        render={({ field }) => (
                            <FormItem className="gap-4 sm:grid-cols-5">
                                <FormLabel>{t('recite-form.labels.pageId')}</FormLabel>
                                <FormControl className="col-span-4">
                                    <ComboBox items={QURAN_PAGES.map((page) => ({ value: String(page), label: String(page) }))} className="w-full" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </form>
        </Form>
    );
}

export default ReciteForm
