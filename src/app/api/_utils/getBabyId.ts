/**supabaseのユーザー情報から取得した情報を元にuserに登録されているbabyIdとリクエストボディ内のbabyIdが一致してたらtrueを返す
 */
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";
export const getBabyId = async (token: string) => {
  const prisma = await buildPrisma();
  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: {
      supabaseUserId: data?.user?.id,
    },
    include: {
      baby: true,
    },
  });
  if (!user || !user.baby) throw new Error("User not found");

  return user.baby.id;
};
