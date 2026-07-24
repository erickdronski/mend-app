-- A role can appear only once in a space. Because create assigns role "a"
-- and join assigns role "b", this database invariant prevents two concurrent
-- joins from racing past the application-level two-person check.
alter table public.mend_space_members
  add constraint mend_space_members_space_role_key unique (space_id, role);
