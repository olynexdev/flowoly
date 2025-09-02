export interface Description {
  title: string;
  description: string;
  images: string[];
}

export interface ProjectT {
  _id: string;
  title: string;
  description: string;
  keyword: string[];
  headingImage: string;
  class: string;
  category: string;
  Deliverables: string;
  Platforms: string;
  portfolioImages: string[];
  descriptions: Description[];
}

export interface PortfolioState {
  portfolios: ProjectT[];
  selectedPortfolio: ProjectT | null;
  loading: boolean;
  error: boolean;
}

interface BlogDescriptionItem {
  title: string;
  description: string;
  subDescription?: string[];
  image?: string;
}

export interface BlogDetailsType {
  id: string;
  title: string;
  date: string;
  blogHeadingImages: string[];
  blogDescription: BlogDescriptionItem[];
  keywords: string[];
  _id: string;
  read: string;
}

export interface InitialBLogTypes {
  blogs: BlogDetailsType[];
  filteredBlogs: BlogDetailsType[];
  blogDetails: BlogDetailsType | null; // Allow null when no blog is selected
  loading: boolean;
  error: any;
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
}
