/**supabaseのユーザー情報から取得した情報を元にuserに登録されているbabyIdとリクエストボディ内のbabyIdが一致してたらtrueを返す
 */
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";
export const checkBabyId = async (token: string, babyId: number) => {
  const prisma = await buildPrisma();
  const { data } = await supabase.auth.getUser(token);
  if (!data.user) return false;
  const user = await prisma.user.findUnique({
    where: {
      supabaseUserId: data.user.id,
    },
    include: {
      baby: {
        select: {
          id: true,
        },
      },
    },
  });
  return user?.babyId === babyId;
};
