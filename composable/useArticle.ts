
import { Article } from '~/types/dto/article.dto'
import articleRepository from '~/repository/article.repository'

export const useArticle = () => {
  const listArticle = ref<Article[]>()
  const isLoadingArticle = ref(false)
  const articlePaging = ref({
    page: 1,
    size: 20,
    totalElement: 0,
    totalPages: 1
  })

  const articleId = ref<number>(0)
  const articleDetail = ref<Article>()
  const isLoadingArticleDetail = ref(false)

  const fetchArticle = async ({ page, size }: { page: number, size: number }) => {
    if (page) {
      articlePaging.value.page = page
    }

    if (size) {
      articlePaging.value.size = size
    }

    const params = { page: articlePaging.value.page, size: articlePaging.value.size }
    isLoadingArticle.value = true
    const { data, error } = await articleRepository.fetchList(params)

    if (data) {
      listArticle.value = data.data
      articlePaging.value.page = data.page
      articlePaging.value.size = data.size
      articlePaging.value.totalElement = data.totalElement
      articlePaging.value.totalPages = data.totalPages
    }
    isLoadingArticle.value = false
  }

  const fetchDetail = async (id: number) => {
    if (!id) {
      return
    }
    isLoadingArticleDetail.value = true
    articleId.value = id
    const {data} = await articleRepository.fetchOne({id: articleId.value})
    if (data) {
      articleDetail.value = data
      isLoadingArticleDetail.value = false
    }
  }

  return {
    listArticle,
    isLoadingArticle,
    articlePaging,
    articleId,
    articleDetail,
    isLoadingArticleDetail,
    fetchArticle,
    fetchDetail
  }
}