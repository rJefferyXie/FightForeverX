interface ArticleFilterProps {
  text: string,
  company: string,
  filters: string[],
  updateFilters: Function
}

const ArticleFilter = (props: React.PropsWithChildren<ArticleFilterProps>) => {
  const { text, company, filters, updateFilters } = props;

  return (
    <div
      className="flex px-2 py-1 w-52 my-1 rounded-lg cursor-pointer bg-zinc-700"
      onClick={() => updateFilters(company)}
    >
      <div 
        className="mr-2 my-auto rounded-full bg-white w-4 h-4 transition-colors duration-300 ease-in-out"
        style={{backgroundColor: filters.includes(company) ? '#10b981' : '#e11d48'}}
      />

      {text}
    </div>
  )
}

export default ArticleFilter;