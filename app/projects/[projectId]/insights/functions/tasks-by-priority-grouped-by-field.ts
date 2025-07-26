interface IPriorityGroupedByField {
  name: string;
  [field: string]: number | string;
}

function getTasksByPriorityGroupedByField<T extends IField>(
  tasks: ITask[],
  priorities: IPriority[],
  fields: T[],
  fieldKey: keyof ITask,
  noFieldLabel: string
): IPriorityGroupedByField[] {
  const priorityMap = new Map<string, IPriorityGroupedByField>();

  // Initialize priority map with fields
  for (const priority of priorities) {
    const fieldCounts: { [field: string]: number } = {};
    for (const field of fields) {
      fieldCounts[field.label] = 0;
    }
    fieldCounts[noFieldLabel] = 0;
    priorityMap.set(priority.id, { name: priority.label, ...fieldCounts });
  }

  // Count tasks based on priorities and fields
  for (const task of tasks) {
    const priorityEntry = priorityMap.get(task.priority || 'No priority');
    if (priorityEntry) {
      const taskField = task[fieldKey] as unknown as string[];
      if (!taskField || (Array.isArray(taskField) && taskField.length === 0)) {
        (priorityEntry[noFieldLabel] as number) += 1;
      } else {
        if (Array.isArray(taskField)) {
          for (const fieldId of taskField) {
            const field = fields.find((f) => f.id === fieldId);
            if (field) {
              (priorityEntry[field.label] as number) += 1;
            }
          }
        } else {
          const field = fields.find((f) => f.id === taskField);
          if (field) {
            (priorityEntry[field.label] as number) += 1;
          }
        }
      }
    } else {
      // Handle tasks with no priority
      const noPriorityEntry = priorityMap.get('No priority');
      if (!noPriorityEntry) {
        const fieldCounts: { [field: string]: number } = {};
        for (const field of fields) {
          fieldCounts[field.label] = 0;
        }
        fieldCounts[noFieldLabel] = 1;
        priorityMap.set('No priority', {
          name: 'No priority',
          ...fieldCounts,
        });
      } else {
        (noPriorityEntry[noFieldLabel] as number) += 1;
      }
    }
  }

  // Convert priority map to array
  const result: IPriorityGroupedByField[] = [];
  for (const [, value] of priorityMap) {
    const { [noFieldLabel]: noField, ...rest } = value;
    result.push({
      ...rest,
      [noFieldLabel]: noField,
    } as IPriorityGroupedByField);
  }

  return result;
}

export function getTasksByPriorityGroupedByStatus(
  tasks: ITask[],
  priorities: IPriority[],
  statuses: IStatus[]
): IPriorityGroupedByField[] {
  return getTasksByPriorityGroupedByField(
    tasks,
    priorities,
    statuses,
    'status_id',
    'No status'
  );
}

export function getTasksByPriorityGroupedByLabels(
  tasks: ITask[],
  priorities: IPriority[],
  labels: ILabel[]
): IPriorityGroupedByField[] {
  return getTasksByPriorityGroupedByField(
    tasks,
    priorities,
    labels,
    'labels',
    'No label'
  );
}

export function getTasksByPriorityGroupedBySize(
  tasks: ITask[],
  priorities: IPriority[],
  sizes: ISize[]
): IPriorityGroupedByField[] {
  return getTasksByPriorityGroupedByField(
    tasks,
    priorities,
    sizes,
    'size',
    'No size'
  );
}
