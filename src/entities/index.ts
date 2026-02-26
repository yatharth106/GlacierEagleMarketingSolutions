/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: casestudies
 * Interface for CaseStudies
 */
export interface CaseStudies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  caseStudyTitle?: string;
  /** @wixFieldType text */
  statisticValue?: string;
  /** @wixFieldType text */
  metricDescription?: string;
  /** @wixFieldType text */
  resultContext?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: engagementtiers
 * Interface for EngagementTiers
 */
export interface EngagementTiers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  tierName?: string;
  /** @wixFieldType text */
  coreOutcome?: string;
  /** @wixFieldType text */
  engagementScope?: string;
  /** @wixFieldType number */
  clientCapacityLimit?: number;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: faqs
 * Interface for FrequentlyAskedQuestions
 */
export interface FrequentlyAskedQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  question?: string;
  /** @wixFieldType text */
  answer?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: optimizationmetrics
 * Interface for OptimizationMetrics
 */
export interface OptimizationMetrics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  metricName?: string;
  /** @wixFieldType text */
  metricDescription?: string;
  /** @wixFieldType text */
  metricCategory?: string;
  /** @wixFieldType text */
  displayFormat?: string;
  /** @wixFieldType text */
  businessImpact?: string;
}


/**
 * Collection ID: problemstatements
 * Interface for ProblemStatements
 */
export interface ProblemStatements {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  problemDescription?: string;
  /** @wixFieldType text */
  problemCategory?: string;
  /** @wixFieldType text */
  symptomExample?: string;
  /** @wixFieldType text */
  revenueImpact?: string;
  /** @wixFieldType boolean */
  isCommon?: boolean;
}


/**
 * Collection ID: processsteps
 * Interface for AdvisoryProcessSteps
 */
export interface AdvisoryProcessSteps {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  stepName?: string;
  /** @wixFieldType number */
  stepNumber?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  illustration?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  outcomeFocus?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  illustrationImage?: string;
}


/**
 * Collection ID: targetindustries
 * Interface for TargetIndustries
 */
export interface TargetIndustries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  industryName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  industryLogo?: string;
  /** @wixFieldType text */
  targetAudience?: string;
  /** @wixFieldType text */
  exampleCompanies?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}
