'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';

interface ProductFiltersProps {
  onFilterChange: (filters: Record<string, string | boolean>) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minWattage: '',
    maxWattage: '',
    cellType: '',
    featured: false,
  });

  const handleChange = (key: string, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      minPrice: '',
      maxPrice: '',
      minWattage: '',
      maxWattage: '',
      cellType: '',
      featured: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Wattage Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min W"
              value={filters.minWattage}
              onChange={(e) => handleChange('minWattage', e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Max W"
              value={filters.maxWattage}
              onChange={(e) => handleChange('maxWattage', e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cell Type</label>
          <select
            value={filters.cellType}
            onChange={(e) => handleChange('cellType', e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="">All Types</option>
            <option value="Monocrystalline">Monocrystalline</option>
            <option value="Polycrystalline">Polycrystalline</option>
            <option value="Thin Film">Thin Film</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Featured Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}
