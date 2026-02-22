// useProjects.ts
// Uses Vite's import.meta.glob to read all project folders from src/prs/
// Each folder must contain info.json and one image file (cover.jpg/png/webp/gif)
// act.json controls whether the entire projects section is shown.

export interface Project {
    id: string;           // folder name
    title: string;        // from info.json
    description: string;  // from info.json
    tags: string[];       // from info.json
    liveUrl?: string;     // from info.json (optional)
    repoUrl?: string;     // from info.json (optional)
    image: string;        // resolved image URL
}

// Eagerly import all info.json files under src/prs/*/
const infoModules = import.meta.glob<{ default: Omit<Project, 'id' | 'image'> }>(
    '/src/prs/*/info.json',
    { eager: true }
);

// Eagerly import all cover images under src/prs/*/
const imageModules = import.meta.glob<{ default: string }>(
    '/src/prs/*/*.{jpg,jpeg,png,webp,gif,svg}',
    { eager: true }
);

// Eagerly import act.json visibility toggle
const actModule = import.meta.glob<{ default: { visible: boolean } }>(
    '/src/prs/act.json',
    { eager: true }
);
const actConfig = actModule['/src/prs/act.json']?.default;
export const projectsVisible: boolean = actConfig?.visible !== false;

function extractFolderName(path: string): string {
    // path like: /src/prs/MyProject/info.json  →  "MyProject"
    const parts = path.split('/');
    return parts[parts.length - 2];
}

export function useProjects(): Project[] {
    const projects: Project[] = [];

    for (const [infoPath, infoMod] of Object.entries(infoModules)) {
        const id = extractFolderName(infoPath);
        const info = infoMod.default;

        // Find matching image for this project folder
        const imagePath = Object.keys(imageModules).find((p) =>
            extractFolderName(p) === id
        );
        const image = imagePath ? imageModules[imagePath].default : '';

        projects.push({
            id,
            title: info.title ?? id,
            description: info.description ?? '',
            tags: info.tags ?? [],
            liveUrl: info.liveUrl,
            repoUrl: info.repoUrl,
            image,
        });
    }

    return projects;
}
