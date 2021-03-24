// Utility to make axios requests
import request from '../utils/request'

// Search user
// q, per_page, page
// total_count, items[avatar_url, url, login, ]
export function getJobs (params) {
  return request({
    url: `/jobs`,
    method: 'get',
    params
  })
}

export function getSkills () {
  return request({
    url: `/skills`,
    method: 'get'
  })
}
