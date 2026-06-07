export const PROJECT_STATUSES = {
    ACTIVE: "ACTIVE",
    DRAFT: "DRAFT",
    ARCHIVED: "ARCHIVED",
} as const;

export type ProjectStatus =
    (typeof PROJECT_STATUSES)[keyof typeof PROJECT_STATUSES];

export const PROJECT_CATEGORIES = {
    AI_AGENT: "AI_AGENT",
    BACKEND: "BACKEND",
    KNOWLEDGE_BASE: "KNOWLEDGE_BASE",
} as const;

export type ProjectCategory =
    (typeof PROJECT_CATEGORIES)[keyof typeof PROJECT_CATEGORIES];

export const PROJECT_STATUS_FILTERS = {
    active: PROJECT_STATUSES.ACTIVE,
    draft: PROJECT_STATUSES.DRAFT,
    archived: PROJECT_STATUSES.ARCHIVED,
} as const;

export const PROJECT_CATEGORY_FILTERS = {
    ai_agent: PROJECT_CATEGORIES.AI_AGENT,
    backend: PROJECT_CATEGORIES.BACKEND,
    knowledge_base: PROJECT_CATEGORIES.KNOWLEDGE_BASE,
} as const;

export type ProjectStatusFilter = keyof typeof PROJECT_STATUS_FILTERS;
export type ProjectCategoryFilter = keyof typeof PROJECT_CATEGORY_FILTERS;

export function toProjectStatusFilter(value?: string) {
    if (!value) {
        return undefined;
    }

    return PROJECT_STATUS_FILTERS[value as ProjectStatusFilter];
}

export function toProjectCategoryFilter(value?: string) {
    if (!value) {
        return undefined;
    }

    return PROJECT_CATEGORY_FILTERS[value as ProjectCategoryFilter];
}