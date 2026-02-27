import { getProfile, updateBio, updateSkills, addExperience, removeExperience } from './storageService.js';

let editMode = {
  bio: false,
  skills: false,
  experience: false
};

export function toggleEditMode(section) {
  editMode[section] = !editMode[section];
  return editMode[section];
}

export function isEditMode(section) {
  return editMode[section];
}

export function renderBio(container) {
  const profile = getProfile();
  if (!profile || !container) return;
  
  const isEditing = editMode.bio;
  
  if (isEditing) {
    container.innerHTML = `
      <div class="bio-edit-form">
        <textarea 
          id="bio-textarea" 
          class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          rows="4"
          placeholder="Escribe tu biografía..."
        >${profile.bio || ''}</textarea>
        <div class="flex gap-2 mt-2">
          <button id="save-bio-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
            Guardar
          </button>
          <button id="cancel-bio-btn" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-semibold">
            Cancelar
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('save-bio-btn')?.addEventListener('click', () => {
      const textarea = document.getElementById('bio-textarea');
      if (textarea) {
        updateBio(textarea.value);
        toggleEditMode('bio');
        renderBio(container);
      }
    });
    
    document.getElementById('cancel-bio-btn')?.addEventListener('click', () => {
      toggleEditMode('bio');
      renderBio(container);
    });
  } else {
    container.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Acerca de</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">${profile.bio || 'No hay biografía disponible.'}</p>
        </div>
        <button id="edit-bio-btn" class="ml-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.getElementById('edit-bio-btn')?.addEventListener('click', () => {
      toggleEditMode('bio');
      renderBio(container);
    });
  }
}

export function renderSkills(container) {
  const profile = getProfile();
  if (!profile || !container) return;
  
  const isEditing = editMode.skills;
  
  if (isEditing) {
    container.innerHTML = `
      <div class="skills-edit-form">
        <input 
          id="skills-input" 
          type="text" 
          class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Ej: JavaScript, React, Node.js (separados por comas)"
          value="${(profile.skills || []).join(', ')}"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Separa las habilidades con comas</p>
        <div class="flex gap-2 mt-2">
          <button id="save-skills-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
            Guardar
          </button>
          <button id="cancel-skills-btn" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-semibold">
            Cancelar
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('save-skills-btn')?.addEventListener('click', () => {
      const input = document.getElementById('skills-input');
      if (input) {
        const skills = input.value.split(',').map(s => s.trim()).filter(s => s);
        updateSkills(skills);
        toggleEditMode('skills');
        renderSkills(container);
      }
    });
    
    document.getElementById('cancel-skills-btn')?.addEventListener('click', () => {
      toggleEditMode('skills');
      renderSkills(container);
    });
  } else {
    const skillsHTML = (profile.skills || []).map(skill => 
      `<span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">${skill}</span>`
    ).join('');
    
    container.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Habilidades</h3>
          <div class="flex flex-wrap gap-2">
            ${skillsHTML || '<p class="text-sm text-gray-500 dark:text-gray-400">No hay habilidades agregadas.</p>'}
          </div>
        </div>
        <button id="edit-skills-btn" class="ml-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.getElementById('edit-skills-btn')?.addEventListener('click', () => {
      toggleEditMode('skills');
      renderSkills(container);
    });
  }
}

export function renderExperience(container) {
  const profile = getProfile();
  if (!profile || !container) return;
  
  const isEditing = editMode.experience;
  
  const experienceItems = (profile.experience || []).map(exp => `
    <div class="border-l-2 border-gray-200 dark:border-gray-700 pl-4 pb-4 relative">
      <div class="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1"></div>
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 dark:text-white">${exp.role}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">${exp.company}</p>
          <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">${exp.startDate} - ${exp.endDate || 'Presente'}</p>
          ${exp.description ? `<p class="text-sm text-gray-700 dark:text-gray-300 mt-2">${exp.description}</p>` : ''}
        </div>
        ${isEditing ? `
          <button class="remove-exp-btn ml-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" data-exp-id="${exp.id}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        ` : ''}
      </div>
    </div>
  `).join('');
  
  container.innerHTML = `
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Experiencia</h3>
      <button id="toggle-exp-mode-btn" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition">
        ${isEditing ? 
          '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' :
          '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'
        }
      </button>
    </div>
    
    ${isEditing ? `
      <div class="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Agregar Experiencia</h4>
        <div class="space-y-2">
          <input id="exp-role" type="text" placeholder="Cargo" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          <input id="exp-company" type="text" placeholder="Empresa" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          <input id="exp-start" type="text" placeholder="Fecha inicio (ej: Ene 2020)" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          <input id="exp-end" type="text" placeholder="Fecha fin (opcional)" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          <textarea id="exp-desc" placeholder="Descripción (opcional)" rows="2" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
          <button id="add-exp-btn" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
            Agregar
          </button>
        </div>
      </div>
    ` : ''}
    
    <div class="space-y-4">
      ${experienceItems || '<p class="text-sm text-gray-500 dark:text-gray-400">No hay experiencia agregada.</p>'}
    </div>
  `;
  
  document.getElementById('toggle-exp-mode-btn')?.addEventListener('click', () => {
    toggleEditMode('experience');
    renderExperience(container);
  });
  
  if (isEditing) {
    document.getElementById('add-exp-btn')?.addEventListener('click', () => {
      const role = document.getElementById('exp-role')?.value;
      const company = document.getElementById('exp-company')?.value;
      const startDate = document.getElementById('exp-start')?.value;
      const endDate = document.getElementById('exp-end')?.value;
      const description = document.getElementById('exp-desc')?.value;
      
      if (role && company && startDate) {
        addExperience({ role, company, startDate, endDate, description });
        renderExperience(container);
      }
    });
    
    document.querySelectorAll('.remove-exp-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const expId = this.dataset.expId;
        if (expId) {
          removeExperience(expId);
          renderExperience(container);
        }
      });
    });
  }
}
