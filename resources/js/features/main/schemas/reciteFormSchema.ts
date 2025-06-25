import { TFunction } from 'i18next';
import { z } from 'zod';

export const useReciteFormSchema = (t: TFunction<'main-page', undefined>) => {
    return z.object({
      selection: z.enum(['friend', 'group']),
      groupId: z.string().optional(),
      userId: z.string(),
      type: z.enum(['tahsin', 'tahfidz']),
      unit: z.enum(['chapter', 'juz', 'page']),
      chapterId: z.string().optional(),
      juzId: z.string().optional(),
      pageId: z.string().optional(),
    }).superRefine((data, ctx) => {
      if (data.selection === 'group' && !data.groupId) {
        ctx.addIssue({ path: ['groupId'], message: 'Group is required', code: z.ZodIssueCode.custom });
      }
      if (data.unit === 'chapter' && !data.chapterId) {
        ctx.addIssue({ path: ['chapterId'], message: 'Chapter is required', code: z.ZodIssueCode.custom });
      }
      if (data.unit === 'juz' && !data.juzId) {
        ctx.addIssue({ path: ['juzId'], message: 'Juz is required', code: z.ZodIssueCode.custom });
      }
      if (data.unit === 'page' && !data.pageId) {
        ctx.addIssue({ path: ['pageId'], message: 'Page is required', code: z.ZodIssueCode.custom });
      }
    });
}
