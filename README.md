# Project Management with Kanban (Dekanban)

A modern project management application built with Next.js that helps teams organize and track their work using a Kanban board interface. The app provides a visual way to manage tasks and workflows while keeping teams synchronized.

## Features

- **Kanban Board**:
  - Drag-and-drop task management
  - Customizable columns/stages
  - Visual task tracking
  - Task filtering and search

- **Authentication**:
  - Multiple sign-in options (Email, GitHub, Google)
  - Secure user authentication
  - Role-based access control

- **Project Management**:
  - Create and organize multiple projects
  - Assign team members to tasks
  - Set due dates and priorities
  - Track project progress

- **User Profiles**:
  - Customizable user profiles
  - Activity tracking
  - Project participation history

## Getting Started

1. Clone the repository
2. Install dependencies:


#### Supabase

## Database Tables

- [users](utils/users.ts)
- [projects](utils/projects.ts)
- [project_members](utils/project_members.ts)
- [statuses](utils/statuses.ts)
- [labels](utils/labels.ts)
- [priorities](utils/priorities.ts)
- [sizes](utils/sizes.ts)
- [tasks](utils/tasks.ts)
- [comments](utils/comments.ts)
- [activities](utils/activities.ts)

#### Supabase Setup


  <!--
  supabase db push -->

1. Create a new project in Supabase
  ```shell
  supabase migration new create_users_table
  ```
2. Create a new database user with the following permissions:
   - Create Role: `authenticator`
   - Create Database: `postgres`
   - Create Schema: `public`

   Add the SQL to your migration file
This creates a new migration file in supabase/migrations directory.

To that file, add the SQL to create this employees table.
  ```sql
    create table if not exists public.users (
      id UUID PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      avatar VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      provider VARCHAR(50) CHECK (provider IN ('google', 'github', 'email')),
      links JSONB
    );
    ```
3. Push the migrations to the database
  ```shell
  supabase migration up
  ```


  ```sql
  CREATE TABLE public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    readme TEXT,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    closed BOOLEAN DEFAULT FALSE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES public.users(id)
);
```
