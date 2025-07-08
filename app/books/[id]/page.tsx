import BookDetailPage from '@/components/pages/BookDetailPage';

type PageParams = {
  params: Promise<{ id: string }>;
};

export default async function BookDetail({ params }: PageParams) {
  const { id } = await params;
  return <BookDetailPage id={id} />;
}