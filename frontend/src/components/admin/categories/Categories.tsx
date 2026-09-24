import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Table from "../../../ui/Table";
import Loading from "../../../ui/Loading";
import { useGetCategories } from "./useGetCategories";
import AddCategory from "./AddCategory";


function Categories() {
  const { isLoading, data } = useGetCategories();
  const categories = data ?? [];

  const handleEdit = (id: string) => {
    console.log("edit category:", id);
  };

  const handleDelete = (id: string) => {
    console.log("delete category:", id);
  };

  return (
    <section className="mx-auto w-full max-w-7xl">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
            دسته بندی محصولات
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
            در این بخش می‌توانید دسته بندی‌های محصولات فروشگاه را مدیریت کنید.
          </p>
        </div>
        <AddCategory />
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-800">
                لیست دسته بندی‌ها
              </h3>

              <p className="mt-1 text-[11px] text-slate-400">
                {categories.length} دسته بندی ثبت شده
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center text-emerald-500">
            <Loading size={28} />
          </div>
        ) : (
          <>
            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <Table>
                <Table.Header>
                  <Table.RowHead>
                    <th className="w-20 text-center px-5 py-4 text-xs font-bold text-slate-400">
                      #
                    </th>

                    <th className="px-5 text-center py-4 text-xs font-bold text-slate-400">
                      عنوان
                    </th>

                    <th className="px-5 text-center py-4 text-xs font-bold text-slate-400">
                      توضیحات
                    </th>

                    <th className="w-32 text-center px-5 py-4 text-center text-xs font-bold text-slate-400">
                      عملیات
                    </th>
                  </Table.RowHead>
                </Table.Header>
                <Table.Body>
                  {categories.map((category, index) => (
                    <Table.RowBody key={category._id}>
                      <td className="px-5 py-4 text-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-xs font-bold text-slate-400">
                          {index + 1}
                        </span>
                      </td>

                      {/* Title */}
                      <td className="px-5 py-4 text-center">
                        <span className="text-sm font-bold text-slate-700">
                          {category.title}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="max-w-md px-5 py-4 text-center">
                        <p className="truncate text-xs text-slate-500">
                          {category.description}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() => handleEdit(category._id)}
                            title="ویرایش"
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(category._id)}
                            title="حذف"
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-400 transition-all hover:bg-red-500 hover:text-white"
                          >
                            <FiTrash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </Table.RowBody>
                  ))}
                </Table.Body>
              </Table>
            </div>

            {/* Empty State */}
            {categories.length === 0 && (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

                <h3 className="mt-4 text-sm font-bold text-slate-700">
                  هنوز دسته بندی‌ای ثبت نشده است
                </h3>

                <p className="mt-2 text-xs text-slate-400">
                  برای شروع، اولین دسته بندی را اضافه کنید.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Categories;