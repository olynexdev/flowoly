export { adminApi, useGetAdminRoleQuery } from './adminApi';
export { awsApi, useDeleteAwsImageMutation } from './awsApi';
export {
  blogApi,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetCategoriesQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from './blogApi';

export {
  projectApi,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectCategoriesQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from './projectApi';

export {
  templateApi,
  useGetTemplatesQuery,
  useGetTemplateBySlugQuery,
  useGetTemplateCategoriesQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} from './templateApi';
